import { Helmet } from "react-helmet";
import Feedback from "../../Components/Feedback/Feedback";
import HighlightClass from "../../Components/HighlightClass/HighlightClass";

import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import OurPartners from "../../Components/OurPartners/OurPartners";



import SwipperSlider from "../../Components/SwipperSlider/SwipperSlider";
import TeacherSection from "../../Components/TeacherSection/TeacherSection";
import Team from "../../Components/Team/Team";

import WebDetails from "../../Components/WebDetails/WebDetails";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <SwipperSlider></SwipperSlider>
         
            <HighlightClass></HighlightClass>
            <TeacherSection></TeacherSection>
           
           
            <WebDetails></WebDetails>
            <Team></Team>
           

            <OurPartners></OurPartners>
         
            <Feedback></Feedback>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;