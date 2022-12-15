import {Link} from 'react-router-dom';
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa';

function Home() {
	return (
		<>
			<section className='heading'>
				<h1>Do you need any support?</h1>
				<p>Please choose an option below</p>

				<Link to='/new-ticket' className='btn btn-reverse btn-block'>
					<FaQuestionCircle /> Create new ticket
				</Link>

				<Link to='/tickets' className='btn btn-block'>
					<FaTicketAlt /> View my tickets
				</Link>
			</section>
		</>
	);
}

export default Home;
