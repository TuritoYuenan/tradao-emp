import { useMemo, useState } from 'preact/hooks';
import EventCard from '$components/EventCard.tsx';
import { Tables } from '$lib/models.ts';
import { search } from '$lib/utils.ts';

export default function EventsFeed({ events }: { events: Tables<'upcoming_events'>[] }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const categories = Array.from(new Set(events.map((event) => event.category!))).sort();

	const filteredEvents = useMemo(() => {
		let filtered = events;

		// Apply search filter
		if (searchQuery.trim()) {
			filtered = search(filtered, searchQuery, ['title', 'description']);
		}

		// Apply category filter
		if (selectedCategory !== 'all') {
			filtered = filtered.filter((event) => event.category === selectedCategory);
		}

		return filtered;
	}, [events, searchQuery, selectedCategory]);

	const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const eventsToDisplay = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setCurrentPage(1); // Reset to first page when filters change
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		setCurrentPage(1); // Reset to first page when filters change
	};

	return (
		<article className='max-w-4xl mx-auto px-4 grid grid-cols-1 gap-4'>
			<search className='flex flex-col md:flex-row gap-2 gap-y-4 md:items-center md:justify-between'>
				<input
					className='search-bar w-full p-2 bg-transparent border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)]'
					id='search'
					type='text'
					placeholder='Search by title or description'
					value={searchQuery}
					onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
				/>
				<select
					className='w-full p-2 bg-transparent rounded-2xl md:w-auto border-2 border-[var(--foreground)] rounded-2xl shadow-[0_0_1rem_rgba(0,0,0,0.2)]'
					id='category'
					value={selectedCategory}
					title='Filter by category'
					onChange={(e) => handleCategoryChange((e.target as HTMLSelectElement).value)}
				>
					<option value='all'>All Categories ({events.length})</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category} ({events.filter((e) => e.category === category).length})
						</option>
					))}
				</select>
			</search>

			{filteredEvents.length === 0 ? <p>No events found</p> : null}

			{eventsToDisplay.map((event) => <EventCard key={event.id} event={event} />)}

			<nav className='flex justify-center items-center gap-2 mt-4'>
				<button
					type='button'
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
					className='button disabled:opacity-50'
				>
					Previous
				</button>

				<span className='px-3 py-1'>
					Page {currentPage} of {totalPages}
				</span>

				<button
					type='button'
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage(currentPage + 1)}
					className='button disabled:opacity-50'
				>
					Next
				</button>
			</nav>
		</article>
	);
}
