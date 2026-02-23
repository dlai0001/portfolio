export async function getCaptchaToken(): Promise<string> {
  return new Promise((resolve) => {
     grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LfhmHQsAAAAAG2mDKdiCFtYJ6DBPEgvXI6Qv1aj', {action: 'SUBMIT'}) as string;
      resolve(token);
    });
  });
}