import { useComputed, useSignal } from '@preact/signals';
import { EventCard } from '$components/EventCard.tsx';
import { search } from '$lib/utils.ts';
import { EventFeedProps } from '$lib/props.ts';

export function EventsFeed({ events }: EventFeedProps) {
	const searchQuery = useSignal('');
	const selectedCategory = useSignal('all');
	const currentPage = useSignal(1);
	const itemsPerPage = 5;

	const categories = Array.from(new Set(events.map((event) => event.category!)))
		.sort();

	const filteredEvents = useComputed(() => {
		let filtered = events;

		// Apply search filter
		if (searchQuery.value.trim()) {
			filtered = search(filtered, searchQuery.value, ['title', 'description']);
		}

		// Apply category filter
		if (selectedCategory.value !== 'all') {
			filtered = filtered.filter((event) => event.category === selectedCategory.value);
		}

		return filtered;
	});

	const totalPages = Math.ceil(filteredEvents.value.length / itemsPerPage);
	const startIndex = (currentPage.value - 1) * itemsPerPage;
	const eventsToDisplay = filteredEvents.value.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	const handleSearch = (query: string) => {
		searchQuery.value = query;
		currentPage.value = 1; // Reset to first page when filters change
	};

	const handleCategoryChange = (category: string) => {
		selectedCategory.value = category;
		currentPage.value = 1; // Reset to first page when filters change
	};

	return (
		<>
			<search className='grid'>
				<div className='s12 m8 field border round prefix'>
					<i className='front'>search</i>
					<input
						id='search'
						type='text'
						placeholder='Search by title or description'
						value={searchQuery}
						onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
					/>
				</div>
				<div className='s12 m4 field border round suffix'>
					<select
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
					<i>arrow_drop_down</i>
				</div>
			</search>

			<div className='space'></div>

			{filteredEvents.value.length === 0 ? <p>No events found</p> : null}

			{eventsToDisplay.map((event) => <EventCard key={event.id} event={event} />)}

			<nav className='center-align'>
				<button
					type='button'
					disabled={currentPage.value === 1}
					onClick={() => currentPage.value -= 1}
				>
					Previous
				</button>

				<span className='px-3 py-1'>
					Page {currentPage} of {totalPages}
				</span>

				<button
					type='button'
					disabled={currentPage.value === totalPages}
					onClick={() => currentPage.value += 1}
				>
					Next
				</button>
			</nav>
		</>
	);
}
