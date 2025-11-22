import { extractHiddenPrompt, uiInfo } from './hidden';

describe('extractHiddenPrompt', () => {
  it('should extract and decode the hidden prompt from uiInfo', () => {
    const result = extractHiddenPrompt(uiInfo);
    expect(result).toContain('BEGIN HIDDEN PROMPT INJECTION');
    expect(result).toContain('END HIDDEN PROMPT INJECTION');
  });

  it('should return null if no base64 string is found', () => {
    const result = extractHiddenPrompt('no base64 here');
    expect(result).toBeNull();
  });
});
