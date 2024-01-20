import RoverSelector from '@/components/search/rover-selector';
import DateSelector from '@/components/search/date-selector';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';

export default function SearchForm() {

    return (
        <div className="m-8">
            <form action={actions.redirectToSearch}>
                <div className="flex flex-col items-center space-y-4">
                    <RoverSelector />
                    <DateSelector />
                    <FormButton>Search</FormButton>
                </div>
            </form>
        </div>
    )
}