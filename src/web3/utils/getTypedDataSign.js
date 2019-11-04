const getTypedDataSign = async (arDataUrl, dataSha256) => {
    const domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
        { name: "salt", type: "bytes32" }
    ];

    const dataModel = [
      { name: "arDataUrl", type: "string" },
      { name: "dataSha256", type: "string" }
    ]

    const domainData = {
        name: "Block Notal",
        version: "1",
        chainId: 4,
        verifyingContract: "0x318572Ae41771f49Ac36A7e11c9DCEAd9260d580",
        salt: "0x9567bfc1ad28e9dac18d12e131b4a45f5d9a3c6cbfe69ff8b34b0fb47703faa0"
    }

    const agreeData = { arDataUrl, dataSha256 }

    const challengeData = {
      types: {
        EIP712Domain: domain,
        AgreeDataModel: dataModel
      },
      domain: domainData,
      primaryType: "AgreeDataModel",
      message: agreeData
    }

    return challengeData
}

export default getTypedDataSign
