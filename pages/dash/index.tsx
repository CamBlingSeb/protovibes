import Dashboard from "components/dashboard/Dashboard";
import Spinner from 'components/ui/Spinner';
import useUser from "data/fetchers/auth/useUser";

/* Rendered via Static Generation */
export default function DashboardPage() {
    const { user } = useUser({
        redirectTo: '/'
    })

    if (!user || user.isLoggedIn === false) {
        return <Spinner />
    }

    return <Dashboard user={user} />
}
