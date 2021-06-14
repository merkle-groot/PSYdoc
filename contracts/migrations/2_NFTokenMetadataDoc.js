const NFTokenMetadataDoc = artifacts.require("NFTokenMetadataDoc");

module.exports = function (deployer) {
    deployer.deploy(NFTokenMetadataDoc, "PSYdoc", "DOC");
  };
  