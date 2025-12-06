import * as aesjs from "aes-js";

class FileDecode {
  private static KEY_STRING = "UKu52ePUBwetZ9wNX88o54dnfKRu0T1l" as const;

  /**
   * @throws { SyntaxError } via parsing invalid JSON from file.
   */
  public static async getDecode(file: File) {
    const textContent = await file.text();

    const base64Regex = /[A-Za-z0-9+/]{100,}(={0,2})/g;
    const matches = textContent.match(base64Regex);

    if (!matches) {
      throw new Error(
        "Base64 string was not found in the file. The file may be corrupted or unencrypted."
      );
    }

    const encryptedBase64 = matches.reduce((a, b) => (a.length > b.length ? a : b));

    // Декодируем Base64 -> Байты
    const binaryString = atob(encryptedBase64);
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const keyBytes = new TextEncoder().encode(this.KEY_STRING);

    // Расшифровываем (режим ECB)
    const aesEcb = new aesjs.ModeOfOperation.ecb(keyBytes);
    let decryptedBytes = aesEcb.decrypt(bytes);

    // Удаляем PKCS7 Padding
    const padding = decryptedBytes[decryptedBytes.length - 1];
    if (padding && padding > 0 && padding <= 16) {
      decryptedBytes = decryptedBytes.slice(0, decryptedBytes.length - padding);
    }

    const jsonString = new TextDecoder().decode(decryptedBytes);

    const jsonObj = JSON.parse(jsonString);
    return jsonObj;
  }
}

export { FileDecode };
