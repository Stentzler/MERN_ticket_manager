import {useSelector, useDispatch} from 'react-redux';
import {closeTicket, getTicket} from '../features/tickets/ticketSlice';
import {FaPlus, FaRegWindowClose} from 'react-icons/fa';
import Modal from 'react-modal';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {getNotes, createNote} from '../features/notes/noteSlice';

const customStyles = {
	content: {
		width: '600px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		position: 'relative',
	},
	overlay: {background: 'rgba(0,0,0,0.65)'},
};

Modal.setAppElement('#root');

function Ticket() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [noteText, setNoteText] = useState('');
	const {ticket, isLoading, isError, message} = useSelector(
		state => state.tickets
	);

	const {notes, isLoading: notesIsLoading} = useSelector(state => state.notes);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {ticketId} = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getTicket(ticketId));
		dispatch(getNotes(ticketId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError, message, ticketId]);

	const onTicketClose = () => {
		dispatch(closeTicket(ticketId));
		toast.success('Ticket closed!');
		navigate('/tickets');
	};

	const openModal = () => {
		setModalIsOpen(true);
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};

	const onNoteSubmit = e => {
		e.preventDefault();

		dispatch(createNote({noteText, ticketId}));
		closeModal();
	};

	if (isLoading || notesIsLoading) {
		return <Spinner />;
	}

	if (isError) {
		<h3>Something went wrong</h3>;
	}
	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton url='/tickets' />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3>Product: {ticket.product}</h3>
				<h3>
					Submitted On: <br />
					{new Date(ticket.createdAt).toLocaleString('en-US')}
				</h3>
				<hr />
				<div className='ticket-desc'>
					<h3>Issue Description</h3>
					<p>{ticket.description}</p>
				</div>
				<h2>Notes:</h2>
			</header>

			{ticket.status !== 'closed' && (
				<button onClick={openModal} className='btn'>
					<FaPlus /> Add Note
				</button>
			)}

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Add Note'
			>
				<h2>Add Note</h2>
				<button className='btn-close' onClick={closeModal}>
					<FaRegWindowClose />
				</button>
				<form onSubmit={onNoteSubmit}>
					<div className='form-group'>
						<textarea
							name='noteText'
							id='noteText'
							className='form-control'
							placeholder='Note text...'
							value={noteText}
							onChange={e => setNoteText(e.target.value)}
						></textarea>
					</div>
					<div className='form-group'>
						<button className='btn' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</Modal>
			{notes.length === 0 && (
				<div className='note'>
					<p>There are no notes for this ticket...</p>
				</div>
			)}
			{notes.map(note => (
				<NoteItem key={note._id} note={note} />
			))}
			{ticket.status !== 'closed' && (
				<button onClick={onTicketClose} className='btn btn-block btn-danger'>
					Close Ticket
				</button>
			)}
		</div>
	);
}

export default Ticket;
