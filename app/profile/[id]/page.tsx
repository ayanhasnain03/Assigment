import getCurrentUser from "@/app/api/actions/getCurrentUser";

const Profile = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
        No user found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">User Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Name:</label>
        <p className="text-gray-700">{currentUser?.name}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Username:</label>
        <p className="text-gray-700">{currentUser?.username}</p>
      </div>
    </div>
  );
};

export default Profile;
