import React from "react";
import { Link } from "react-router-dom";
import "./11_about.css";

function About() {
    return (
        <div className="about">
            <div className="txt_about11">O geoportalu</div>
            <div className="txt_body11">
                <p>
                    W tym miejscu pojawi się tekst, opisujący funkcjonalność strony internetowej. Na ten moment zamieszczono tekst zastępczy - o kotkach.<br/><br/>
                    Kotki są niezwykłe stworzenia, które od wieków towarzyszą ludziom, zachwycając swym urokiem i tajemniczością. Są symbolem elegancji, niezależności oraz przywiązania. Te małe futrzaki potrafią być zarówno wylewnymi przyjaciółmi, jak i tajemniczymi samotnikami, co sprawia, że każde spotkanie z nimi jest niepowtarzalnym doświadczeniem.<br/>
                    Kotki znane są z ich niezwykłego wdzięku i zwinności. Ich sierść, często miękka i puszysta, zachęca do głaskania, a delikatne mruczenie potrafi rozgrzać serce nawet największego zmarzlaka. To prawdziwi mistrzowie w doskonaleniu sztuki lenistwa, lubiące się relaksować na słońcu albo w ciepłym, miękkim kocu.<br/>
                    Jednakże, kotki to także zwierzęta o silnej woli i własnym zdaniu. Nie zawsze łatwo zrozumieć, co się w nich dzieje, gdyż często potrafią być niezwykle tajemnicze i niezależne. Ich charakter potrafi być równie zmienny jak pogoda wiosenna, co sprawia, że życie z kotką jest niezwykle fascynujące i pełne niespodzianek.<br/>
                    Dla wielu ludzi kotki są nie tylko zwierzętami domowymi, ale także członkami rodziny. Ich lojalność i oddanie są niezapomniane, a więź, jaką budują z ludźmi, często przekracza granice zwykłego zrozumienia. Kotki potrafią być wsparciem w trudnych chwilach i radością w codzienności, co sprawia, że są nieocenionymi towarzyszami życia.<br/>
                </p>            
            </div>
            <div className="button_back11">
                <Link to="../">
                    <button className="box_back11">
                        <div className="txt_back11">Powrót do startu</div>
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default About;