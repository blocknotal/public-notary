pragma solidity >=0.4.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract BlockNotalPublicAgree{
    struct AgreeDataModel{
        string arDataUrl;
        string dataSha256;
    }

    struct SignModel{
        uint8 V;
        bytes32 R;
        bytes32 S;
    }

    enum STATE_SIGN{
        NOT_EXIST, PENDING, CONFIRMED
    }

    uint256 agreeId;
    mapping(uint256 => address[]) private agreeSigners;
    mapping(uint256 => AgreeDataModel) private agreeData;
    mapping(uint256 => mapping (address => SignModel)) private proofSignature;
    mapping(uint256 => mapping (address => STATE_SIGN)) private signStatus;
    mapping(address => uint256[]) private agreeOwner;
    mapping(address => uint256[]) private userAgrees;
    mapping(string => uint256) private dataHashToAgreeId;
    mapping(uint256 => address) private userDeploy;
    
    //dApp Domain
    address public verifyingContract = address(this);
    uint256 constant chainId = 4;  //CHAIN ID 1:main 3:ropsten 4:rynkeby
    bytes32 constant salt = 0x9567bfc1ad28e9dac18d12e131b4a45f5d9a3c6cbfe69ff8b34b0fb47703faa0;
    string private constant EIP712_DOMAIN = "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)";
    bytes32 public constant EIP712_DOMAIN_TYPEHASH = keccak256(abi.encodePacked(EIP712_DOMAIN));
    
    bytes32 private DOMAIN_SEPARATOR = keccak256(abi.encode(
        EIP712_DOMAIN_TYPEHASH,
        keccak256("Block Notal"),
        keccak256("1"),
        chainId,
        verifyingContract,
        salt
    ));

    string private constant AGREE_TYPE = "AgreeDataModel(string arDataUrl,string dataSha256)";
    bytes32 public constant AGREE_TYPEHASH = keccak256(abi.encodePacked(AGREE_TYPE));

    function hashAgreeModel(AgreeDataModel memory _data) private view returns (bytes32){
        return keccak256(
            abi.encodePacked(
                    "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        AGREE_TYPEHASH,
                        keccak256(bytes(_data.arDataUrl)),
                        keccak256(bytes(_data.dataSha256))
                    ))
            ));
    }

    function recoverAddressSign(AgreeDataModel memory _data, uint8 sigV, bytes32 sigR, bytes32 sigS) public view returns (address){
        return ecrecover(hashAgreeModel(_data), sigV, sigR, sigS);
    }

    modifier validateNewAgree(string memory docHash){
        require(dataHashToAgreeId[docHash] == 0);
        _;
    }

    function newPublicAgree(address[] memory _signers, AgreeDataModel memory _agreeData) public validateNewAgree(_agreeData.dataSha256){
        agreeSigners[agreeId] = _signers;
        uint size = _signers.length;
        agreeData[agreeId] = _agreeData;
        dataHashToAgreeId[_agreeData.dataSha256] = agreeId;
        for(uint i = 0; i < size; i++){
            userAgrees[_signers[i]].push(agreeId);
            signStatus[agreeId][_signers[i]] = STATE_SIGN.PENDING;
        }
        agreeOwner[msg.sender].push(agreeId);
        userDeploy[agreeId] = msg.sender;
        agreeId += 1;
    }
    
    modifier validateSignature(uint256 _agreeId, uint8 _sigV, bytes32 _sigR, bytes32 _sigS, address _signerAddress){
        address recoveredAddress = recoverAddressSign(agreeData[_agreeId], _sigV, _sigR, _sigS);
        require(signStatus[_agreeId][recoveredAddress] == STATE_SIGN.PENDING && recoveredAddress == _signerAddress);
        _;
    }

    event newSign(uint _agreeId, address _signer);

    function signAgree(uint256 _agreeId, uint8 _sigV, bytes32 _sigR, bytes32 _sigS, address _signer) public validateSignature(_agreeId, _sigV, _sigR, _sigS, _signer){
        proofSignature[_agreeId][_signer] = SignModel(_sigV, _sigR, _sigS);
        signStatus[_agreeId][_signer] = STATE_SIGN.CONFIRMED;
        emit newSign(_agreeId, _signer);
    }

    function getUserContracts(address _userAddress) public view returns(uint256[] memory){
        return userAgrees[_userAddress];
    }

    struct ResultModel{
        uint id;
        STATE_SIGN[] status;
        SignModel[] signatures;
        address[] signers;
        AgreeDataModel data;
        address owner;
    }

    function getAgreeFullData(uint256 _agreeId) public view returns(ResultModel memory){
        uint sizeSigners = agreeSigners[_agreeId].length;
        SignModel[] memory signData = new SignModel[](sizeSigners);
        STATE_SIGN[] memory status = new STATE_SIGN[](sizeSigners);
        for(uint i = 0; i < sizeSigners; i++){
            status[i] = signStatus[_agreeId][agreeSigners[_agreeId][i]];
            signData[i] = proofSignature[_agreeId][agreeSigners[_agreeId][i]];
        }
        return ResultModel(_agreeId, status, signData, agreeSigners[_agreeId], agreeData[_agreeId], userDeploy[_agreeId]);
    }

    function getUserAgreeFullData(address _userAddress) public view returns(ResultModel[] memory){
        uint size = userAgrees[_userAddress].length;
        ResultModel[] memory resultData = new ResultModel[](size);
        for(uint i = 0; i < size; i++){
            resultData[i] = getAgreeFullData(userAgrees[_userAddress][i]);
        }
        return resultData;
    }

    function getUserPendingAgreeFullData(address _userAddress) public view returns(ResultModel[] memory){
        uint size = userAgrees[_userAddress].length;
        ResultModel[] memory resultData = new ResultModel[](size);
        for(uint i = 0; i < size; i++){
            if(signStatus[i][_userAddress] == STATE_SIGN.PENDING){
                resultData[i] = getAgreeFullData(userAgrees[_userAddress][i]);
            }
        }
        return resultData;
    }

    function getDeployAgrees(address _userAddress) public view returns(ResultModel[] memory){
        uint size = agreeOwner[_userAddress].length;
        ResultModel[] memory resultData = new ResultModel[](size);
        for(uint i = 0; i < size; i++){
            resultData[i] = getAgreeFullData(agreeOwner[_userAddress][i]);
        }
        return resultData;
    }

    function getAgreeByHash(string memory _docHash) public view returns(ResultModel memory){
        return getAgreeFullData(dataHashToAgreeId[_docHash]);
    }
}