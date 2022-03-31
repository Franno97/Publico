export var Config = (function () {
    var DeviceKeyIdentifier = "dSx0UqwAUxK3k32CY1eRXSVShwAtlTFa";

    var BaseURL = "https://rf.cancilleria.gob.ec";

    var ProductionKeyText = {
        "domains": "mydomain.com",
        "expiryDate": "2022-05-10",
        "key": "00304502210081b07f33197b7a7be27cdb0665ec564014e42006e93b5234ac6c46791c88a7ac02205e3eee50b26cfe47af81d45128701bfceedc8779d8873a31274fa86f8c241153"
    };

    var PublicFaceScanEncryptionKey = "-----BEGIN PUBLIC KEY-----\n" +
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5PxZ3DLj+zP6T6HFgzzk\n" +
        "M77LdzP3fojBoLasw7EfzvLMnJNUlyRb5m8e5QyyJxI+wRjsALHvFgLzGwxM8ehz\n" +
        "DqqBZed+f4w33GgQXFZOS4AOvyPbALgCYoLehigLAbbCNTkeY5RDcmmSI/sbp+s6\n" +
        "mAiAKKvCdIqe17bltZ/rfEoL3gPKEfLXeN549LTj3XBp0hvG4loQ6eC1E1tRzSkf\n" +
        "GJD4GIVvR+j12gXAaftj3ahfYxioBH7F7HQxzmWkwDyn3bqU54eaiB7f0ftsPpWM\n" +
        "ceUaqkL2DZUvgN0efEJjnWy5y1/Gkq5GGWCROI9XG/SwXJ30BbVUehTbVcD70+ZF\n" +
        "8QIDAQAB\n" +
        "-----END PUBLIC KEY-----";

    function initializeFromAutogeneratedConfig(FaceTecSDK, callback) {
        FaceTecSDK.initializeInProductionMode(ProductionKeyText, this.DeviceKeyIdentifier, this.PublicFaceScanEncryptionKey,
            function (initializedSuccessfully) {
                callback(initializedSuccessfully);
            });
    };

    // This app can modify the customization to demonstrate different look/feel preferences
    // NOTE: This function is auto-populated by the FaceTec SDK Configuration Wizard based on your UI Customizations you picked in the Configuration Wizard GUI.
    function retrieveConfigurationWizardCustomization(FaceTecSDK) {
        var defaultCustomization = new FaceTecSDK.FaceTecCustomization();
        this.currentCustomization = defaultCustomization;
        return defaultCustomization;
    };

    var currentCustomization;

    // -------------------------------------
    // Boolean to indicate the FaceTec SDK Configuration Wizard was used to generate this file.
    // In this Sample App, if this variable is true, a "Config Wizard Theme" will be added to this App's Design Showcase,
    // and choosing this option will set the FaceTec SDK UI/UX Customizations to the Customizations that you selected in the
    // Configuration Wizard.
    var wasSDKConfiguredWithConfigWizard = false;

    return {
        wasSDKConfiguredWithConfigWizard,
        DeviceKeyIdentifier,
        BaseURL,
        PublicFaceScanEncryptionKey,
        initializeFromAutogeneratedConfig,
        currentCustomization,
        retrieveConfigurationWizardCustomization
    };

})();
