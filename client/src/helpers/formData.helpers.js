export const createFormData = (form) => {
  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('location', form.location);
  formData.append('description', form.description);
  formData.append('price', form.price);
  formData.append('photo', form.photo);
  return formData
};

