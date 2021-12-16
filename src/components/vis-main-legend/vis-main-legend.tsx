import { Component, Host, h, ComponentInterface, Prop } from '@stencil/core';
import { LegendData } from '../../utils/data';

@Component({
  tag: 'vis-main-legend',
  styleUrl: 'vis-main-legend.css',
  shadow: true,
})
export class VisMainLegend implements ComponentInterface {
  @Prop() data: LegendData;

  render() {
    return (
      <Host>
        <div style={{ padding: '1rem' }}>
          <h3>{this.data.variable}</h3>
          {this.data.colorMap?.map(([min, max, color, name]) => (
            <div>
              <div style={{ height: '1em', width: '1em', background: color, display: 'inline-block', marginRight: '1em' }}></div>
              {name || `${min} to ${max}`}
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
