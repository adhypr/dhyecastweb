// Helper format tampilan yang dipakai lintas halaman

const IMAGE_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#f3f4f6"/>' +
      '<text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" font-size="18" ' +
      'text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'
  );

export const formatRupiah = (amount = 0) => `Rp ${Number(amount).toLocaleString("id-ID")}`;

// Mendukung path file statis ("images/x.jpg") maupun data URL hasil upload (base64)
export const getImageSrc = (img) => {
  if (!img) return IMAGE_PLACEHOLDER;
  if (img.startsWith("data:") || img.startsWith("http")) return img;
  return `/${img}`;
};
