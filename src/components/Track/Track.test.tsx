import { render, screen } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import ReduxProvider from '@/store/ReduxProvider';
import Track from '@/components/Track/Track';
import { formatTime } from '@/utils/helper';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('Track component', () => {
  test('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );
    // Проверяем отображение автора
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    // Проверяем отображение названия трека
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    // Проверяем отображение длительности трека
    expect(
      screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length,
    ).toBeGreaterThan(0);
  });
});
