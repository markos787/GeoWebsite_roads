import React from "react";
import { Link } from "react-router-dom";
import "./11_about.css";

function About() {
    return (
        <div className="about">
            <div className="txt_about11">O geoportalu</div>
            <div className="txt_body11">
                <p>
                    <br/>GEOPORTAL UTRUDNIEŃ W RUCHU DROGOWYM stanowi system, którego celem jest prezentacja utrudnień w ruchu na danym odcinku drogowym ze względu na remonty oraz o pracownikach poszczególnych remontów. Jest to geoportal, a zatem posiada jasne odniesienie przestrzenne udostępnianych przez siebie danych.<br/><br/>
                    Geoportal opiera się na dwóch zasadniczych filarach – części dla użytkowników zalogowanych oraz niezalogowanych. Warto wspomnieć, że na każdej karcie w każdej części znajduje się przycisk info, który przekierowuje do niniejszej strony.<br/>
                    Pierwsza część wymaga uwierzytelnienia poprzez wprowadzenie właściwego loginu oraz hasła, udostępnianego wąskiemu gronu odbiorców. Hasło można podejrzeć dzięki ikonie oka. Po zalogowaniu użytkownik przechodzi do menu, w którym może wybrać kolejny podzbiór geoportalu – dane o remontach na odcinkach drogowych oraz dane o pracownikach tych remontów.<br/>
                    Dane udostępniane są w formie interaktywnej mapy, bazy danych w formie listy lub bazy danych w formie obiektów. Po przejściu do mapy pojawia się portal mapowy, zawierający przekazane z bazy danych informacje o pracownikach lub remontach. Kliknięcie na dany obiekt powoduje pojawienie się bardziej dogłębnych informacji o nim. Ponadto, istnieje możliwość zmiany mapy podkładowej, wyszukiwania obiektów po numerze ID i automatycznego przybliżania do nich oraz pomiarów odległości oraz azymutu na mapie. Z tego widoku można bezpośrednio przejść do obu widoków bazy danych oraz do menu.<br/>
                    Baza danych w formie listy zawiera wyszczególnione informacje o wszystkich obiektach z odpowiedniej bazy danych. Obiekty te można sortować po każdym polu rosnąco lub malejąco, a także filtrować według dowolnej wartości dowolnego pola.<br/>
                    Z powyższego widoku można bezpośrednio przejść do bazy danych w ujęciu obiektów. Ma to formę dashboardu, w którym można filtrować wyświetlane dane, tak jak poprzednio. Kliknięcie jednego z nich powoduje przejście do osobnej karty danego obiektu, w którym znajdują się wszystkie informacje o nim oraz mapa przybliżona do właśnie tego obiektu.<br/><br/>
                    Geoportal dla użytkowników niezalogowanych jest okrojony względem tego dla zalogowanych. Posiada dostęp jedynie do mapy oraz bazy danych w ujęciu listy. Mapa nie posiada możliwości wykonywania pomiarów oraz wyszukiwania obiektów, jednak po kliknięciu obiektu nadal pojawiają się informacje o nim. Baza danych listowa posiada wszystkie te same funkcjonalności, co analogiczna baza dla użytkowników zalogowanych.<br/><br/><br/>
                    Presented exclusively by Marek Weis ®
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