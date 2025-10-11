import ProfileLayout from "@/components/profile/ProfileLayout";

import MyProfileData from "@/mock/myProfileData.json";

//내 프로필조회
const MyProfile = () => {
  return (
    <div>
      <ProfileLayout
        profileImg={MyProfileData.profileUrl}
        nickname={MyProfileData.name}
        stateMessage={MyProfileData.stateMessage}
        isMyProfile={true}
      />
    </div>
  );
};
export default MyProfile;
