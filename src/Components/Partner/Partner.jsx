import bkash from "../../assets/partners/bkash.jpg"
import nagad from "../../assets/partners/nagad.jpg"
import walton from "../../assets/partners/walton.jpg"
import basundhara from "../../assets/partners/basundhara.png"
import city from "../../assets/partners/city.jpg"
import square from "../../assets/partners/square.jpg"

const Partner = () => {
  return (
    <div>
      <section className="m-4 md:m-8 dark:bg-gray-100 dark:text-gray-800">
        <div className="container mx-auto p-4 my-6 space-y-2 text-center">
          <h2 className="text-5xl font-bold">In Partnership with Excellence</h2>
          <p className="dark:text-gray-600">Building Success Through Collaboration</p>
        </div>
        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-4">
            <img className="w-16 h-16" src={bkash} alt="" />
            <h3 className="my-3 text-3xl font-semibold">Bkash</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>We are thrilled to announce our partnership with bKash, a leading mobile financial service provider, to enhance and expand educational opportunities for learners across Bangladesh</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <img className="w-16 h-16" src={nagad} alt="" />
            <h3 className="my-3 text-3xl font-semibold">Nagad</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>We are proud to announce our partnership with Nagad, a prominent digital financial service provider in Bangladesh, to revolutionize how educational services are accessed and delivered.</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <img className="w-16 h-16" src={walton} alt="" />
            <h3 className="my-3 text-3xl font-semibold">Walton</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>We are excited to announce our partnership with Walton, a leading multinational conglomerate in Bangladesh, to advance educational opportunities through technological innovation</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <img className="w-16 h-16" src={basundhara} alt="" />
            <h3 className="my-3 text-3xl font-semibold">Bashundhara</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>We are thrilled to announce our partnership with Bashundhara Group, one of the largest and most diversified industrial conglomerates in Bangladesh, to elevate educational opportunities and resources for students across the nation.</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <img className="w-16 h-16" src={city} alt="" />
            <h3 className="my-3 text-3xl font-semibold">City Group</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>We are excited to announce our partnership with City Group, a leading conglomerate in Bangladesh, to enhance educational opportunities and resources for students across the country.</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
          <img className="w-16 h-16" src={square} alt="" />
            <h3 className="my-3 text-3xl font-semibold">Square Group</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>We are proud to announce our partnership with Square Group, one of Bangladesh's leading and most diversified conglomerates, to elevate educational opportunities and resources for students across the nation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partner;
