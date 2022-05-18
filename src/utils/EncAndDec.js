/**
 * RSA非对称加密
 * @param data 需要加密的数据
 */
import { JSEncrypt } from 'jsencrypt'

export function rsaEncrypt(data) {
  // 公钥
  const PUBLIC_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiIggAnwTWYAFHQC/Z7OVv/WkuYtSEtszQEL/taRgOafCS3FWMV+9q5MFslnea/av1Sm01ByO7/+9qErvRHnFCMErhRzUSs+c2AZNRNluz4HbrQLKZRye84X22ViWttlqGYO4naaIdg8nDid546kCxa9liJ1PyHf3XMgudgESqbQIDAQAB`
  // 使用公钥加密
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUBLIC_KEY)
  const result = encrypt.encrypt(data)
  return result
}
