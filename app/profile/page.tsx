import DangerZone from "./_components/DangerZone";
import EditProfileForm from "./_components/EditProfileForm";

export default async function Profile() {
  return (
    <div>
      <div className="max-w-screen-xl pt-10 w-full mx-auto">
        <h1 className="font-extrabold text-2xl">Profile</h1>
        <p className="text-sm text-muted-foreground pt-1">
          Manage your profile details
        </p>
        <EditProfileForm />
        <DangerZone />
      </div>
    </div>
  );
}
