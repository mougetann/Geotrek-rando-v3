import parse, { DOMNode, Element } from 'html-react-parser';
import { Suggestion } from 'modules/home/interface';

export const getSuggestionType = (rawType?: string) => {
  if (rawType === 'touristicContent') {
    return 'service';
  }
  if (rawType === 'touristicEvent') {
    return 'events';
  }
  if (rawType === 'outdoorSite') {
    return 'outdoor';
  }
  return 'trek';
};
export const getSuggestionsFromContent = (rawContent: string) => {
  const content = rawContent;
  const suggestions: Suggestion[] = [];
  parse(content, {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        'data-ids' in domNode.attribs &&
        'data-type' in domNode.attribs
      ) {
        suggestions.push({
          iconUrl: '',
          titleTranslationId: domNode.attribs['data-label'],
          ids: domNode.attribs['data-ids'].split(','),
          type: getSuggestionType(domNode.attribs['data-type']),
        });

        return domNode;
      }
      return domNode;
    },
  });

  return suggestions;
};
