function App() {
    return (
        <div>
            <Person
            name="Peter"
            age="41"
            hobbies={["bowling", "binge watching tv", "drinking beer"]}
            />
            <Person
            name="Lois"
            age="38"
            hobbies={["housewife", "groceries", "cooking"]}
            />
            <Person
            name="Meg"
            age="18"
            hobbies={["being meg", "shut up meg", "meg"]}
            />
        </div>
    );
}