import person1 from '../../assets/team/shoeb.jpeg'
import person2 from '../../assets/team/person-1.jpg'
import person3 from '../../assets/team/person-2.jpg'
import person4 from '../../assets/team/person-3.jpg'
import person5 from '../../assets/team/person-4.jpg'
import person6 from '../../assets/team/person-6.jpg'

const OurTeam = () => {
  return (
    <div>
      <section className="mt-10">
        <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
          <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">Meet Our Team</h1>
          <p className="max-w-2xl text-center">
          Get to know the passionate professionals dedicated to making our mission a reality. Meet the talented individuals behind our success.
          </p>
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full"
              src={person1}
            />
            <p className="text-xl font-semibold leading-tight"></p>
            <p></p>
          </div>
          <div className="flex flex-row flex-wrap-reverse justify-center">
            <div className="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full"
                src={person2}
              />
              <p className="text-xl font-semibold leading-tight">Michael Smith</p>
              <p>Chief Technology Officer (CTO)</p>
            </div>
            <div className="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
                src={person6}
              />
              <p className="text-xl font-semibold leading-tight">Sarah Lee</p>
              <p>Head of Content Development</p>
            </div>
            <div className="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full"
                src={person3}
              />
              <p className="text-xl font-semibold leading-tight">James Brown</p>
              <p>Marketing Director</p>
            </div>
            <div className="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full"
                src={person4}
              />
              <p className="text-xl font-semibold leading-tight">Rachel Green</p>
              <p>(UX) Designer</p>
            </div>
            <div className="flex flex-col justify-center m-8 text-center">
              <img
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full"
                src={person5}
              />
              <p className="text-xl font-semibold leading-tight">David Martinez</p>
              <p>Educational Consultant</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
