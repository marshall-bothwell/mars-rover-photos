import RoverSelector from '@/components/search/rover-selector';
import DateSelector from '@/components/search/date-selector';
import * as actions from '@/actions';

import { Button } from '@/components/ui/button';

export default function SearchForm() {

    return (
        <div className="m-8">
            <form action={actions.redirectToSearch}>
                <div className="flex flex-col items-center space-y-4">
                    <RoverSelector />
                    <DateSelector />
                    <Button type="submit">Search</Button>
                </div>
            </form>
        </div>
    )
}