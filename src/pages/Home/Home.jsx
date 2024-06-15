import SponsorSection from "./SponsorSection";
import SwipperSlider from "./SwipperSlider";
import TeacherJoinSection from "./TeacherJoinSection";



const Home = () => {
    return (
        <div>
          {/* <h2>This is HomePage</h2> */}
          <SwipperSlider></SwipperSlider>
          <SponsorSection></SponsorSection>
          <TeacherJoinSection></TeacherJoinSection>
        </div>
    );
};

export default Home;