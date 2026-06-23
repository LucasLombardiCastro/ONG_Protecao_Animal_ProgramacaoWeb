const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImagem(arquivo: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Upload de imagens não configurado (variáveis do Cloudinary ausentes).');
  }

  const formData = new FormData();
  formData.append('file', arquivo);
  formData.append('upload_preset', UPLOAD_PRESET);

  const resposta = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!resposta.ok) {
    throw new Error('Falha ao enviar a imagem. Tente novamente.');
  }

  const dados = await resposta.json();
  return dados.secure_url as string;
}