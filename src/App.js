import Library from './components/Library';
import LoadingAnimation from './components/LoadingAnimation';
import { Switch, Route } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <Switch>
          <Route path="/library" component={Library} />
          {/* Add more routes for other pages/components */}
          {/* <Route path="/other-page" component={OtherPage} /> */}
          {/* <Route path="/another-page" component={AnotherPage} /> */}
          {/* ... */}
          <Redirect to="/library" />
        </Switch>
      )}
    </div>
  );
}

export default App;


