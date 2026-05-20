import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarkdownInput } from './MarkdownInput';

describe('MarkdownInput', () => {
  it('wraps the selected text in bold markdown', () => {
    const onChange = vi.fn();
    render(<MarkdownInput value="impact" onChange={onChange} />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(0, 6);

    fireEvent.click(screen.getByTitle('Bold'));

    expect(onChange).toHaveBeenCalledWith('**impact**');
  });

  it('inserts a markdown link around the selected text', () => {
    const onChange = vi.fn();
    render(<MarkdownInput value="portfolio" onChange={onChange} />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(0, 9);

    fireEvent.click(screen.getByTitle('Link'));

    expect(onChange).toHaveBeenCalledWith('[portfolio](url)');
  });
});
