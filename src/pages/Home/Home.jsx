import Feedback from "../../Components/Feedback/Feedback";
import HighlightClass from "../../Components/HighlightClass/HighlightClass";

import NewsLetter from "../../Components/NewsLetter/NewsLetter";

import OurTeam from "../../Components/OurTeam/OurTeam";
import Partner from "../../Components/Partner/Partner";
import SwipperSlider from "../../Components/SwipperSlider/SwipperSlider";
import TeacherSection from "../../Components/TeacherSection/TeacherSection";
import WebDetails from "../../Components/WebDetails/WebDetails";

const Home = () => {
    return (
        <div>
            <SwipperSlider></SwipperSlider>
         
            <HighlightClass></HighlightClass>
            <TeacherSection></TeacherSection>
           
            <WebDetails></WebDetails>
            <OurTeam></OurTeam>
            <Partner></Partner>
            <Feedback></Feedback>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;