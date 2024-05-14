import "./style.css";
import Banner from "../../components/banner/index";
import Icon from "../../components/icon/index";
import chat from "../../assets/icon-chat.png";
import money from "../../assets/icon-money.png";
import security from "../../assets/icon-security.png";
const datas = [
    {
        id: 1,
        icon: chat,
        title: "You are our #1 priority",
        description:
            "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
        id: 2,
        icon: money,
        title: "More savings means higher rates",
        description:
            "The more you save with us, the higher your interest rate will be!",
    },
    {
        id: 3,
        icon: security,
        title: "Security you can trust",
        description:
            "We use top of the line encryption to make sure your data and money is always safe.",
    },
];
function Home() {
    return (
        <div>
            <Banner />
            <div className="features">
                <h2 className="sr-only">Features</h2>
                {datas.map((data) => (
                    <Icon
                        key={data.id}
                        title={data.title}
                        icon={data.icon}
                        description={data.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
