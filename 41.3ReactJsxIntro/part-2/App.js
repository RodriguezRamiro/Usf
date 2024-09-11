function App(){
    return(
        <div>
            <Tweet
            name="Lois Lane"
            username="supaman"
            date={new Date().toDateString()}
            message="This app will break the internet in Metropolis"
            />
             <Tweet
            name="Elenore Holmes"
            username="sherlock"
            date={new Date().toDateString()}
            message="#Hastagsarethebest"
            />
             <Tweet
            name="Jeremy Garcia"
            username="garcia1"
            date={new Date().toDateString()}
            message="This is X, former Twitter"
            />
        </div>
    )
}