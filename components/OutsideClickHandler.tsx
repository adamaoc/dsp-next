import * as React from 'react';

interface OutsideClickHandlerProps {
  onOutsideClick: (e: any) => void;
  className?: string;
  children: any;
}

class OutsideClickHandler extends React.Component<OutsideClickHandlerProps, any> {
  childNode: HTMLDivElement | null | undefined;
  constructor(props: OutsideClickHandlerProps) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick, { capture: true });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, { capture: true });
  }

  onOutsideClick(e: any) {
    const { onOutsideClick } = this.props;
    const { childNode } = this;
    const isDescendantOfRoot = childNode && childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      onOutsideClick(e);
    }
  }

  render() {
    return (
      <div className={this.props.className} ref={node => this.childNode = node }>
        {this.props.children}
      </div>
    );
  }
}

export default OutsideClickHandler;