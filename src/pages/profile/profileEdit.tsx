import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import ProfileNav from "../../components/ProfileNav";
import ProfileWrapper from "../../components/ProfileWrapper";

const ProfileEdit = () => {
  return (
    <div className="messenger relative sm:static">
      <Container>
        <div className="sm:flex mt-10 mb-20 sm:mb-0 sm:mt-10">
          <ProfileNav />
          <ProfileWrapper>
            <div className="flex items-center justify-center w-full h-[500px] bg-[#20232B] rounded-lg">
              <div className="opacity-70 text-lg">Пока шо нема</div>
            </div>
          </ProfileWrapper>
        </div>
      </Container>
    </div>
  );
};

export default ProfileEdit;
