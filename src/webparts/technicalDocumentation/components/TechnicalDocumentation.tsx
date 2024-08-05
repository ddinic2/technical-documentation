import * as React from 'react';
import styles from './TechnicalDocumentation.module.scss';
import { ITechnicalDocumentationProps } from './ITechnicalDocumentationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import App from './App';

export default class TechnicalDocumentation extends React.Component<ITechnicalDocumentationProps, {}> {
  public render(): React.ReactElement<ITechnicalDocumentationProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      user
    } = this.props;

    return (
      <App user={user} />
    );
  }
}
