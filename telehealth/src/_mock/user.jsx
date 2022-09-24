const users = [...Array(24)].map((_, index) => ({
  id: 1,
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: 'Jane Doe',
  company: 'Omdena',
  isVerified: true,
  status: 'online',
  role: 'admin',
}));

export default users;
