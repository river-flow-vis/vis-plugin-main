import { Component, Host, h, ComponentInterface, Prop, State, Watch, Element } from '@stencil/core';
import { TimeControlData } from '../../utils/data';

const MS_IN_SECOND = 1000;

@Component({
  tag: 'vis-main-time-control',
  styleUrl: 'vis-main-time-control.css',
  shadow: true,
})
export class VisMainTimeControl implements ComponentInterface {
  static readonly TAG_NAME = 'vis-main-time-control';

  private timestamps: { year: string; timestamp: string }[];
  private animationTimer: NodeJS.Timer;

  @Element() hostElement: HTMLVisMainTimeControlElement;

  @State() playing = false;
  @State() timestampsPerSecond = 2;

  @State() timestamp: { year: string; timestamp: string };

  @Watch('timestamp')
  timestampChanged(timestamp: { year: string; timestamp: string }) {
    this.data?.updateTime?.(timestamp?.year, timestamp?.timestamp);
  }

  @Prop() data: TimeControlData;

  @Watch('data')
  dataChanged(data: TimeControlData) {
    const years: string[] = [];
    const yearRange = data?.yearRange;
    for (let i = yearRange?.[0]; i <= yearRange?.[1]; i++) {
      years.push(i.toString());
    }
    this.timestamps = years.flatMap(year => {
      const firstLayerData = [...data?.layerDataMap.values()]?.[0];
      return Object.keys(firstLayerData?.[Object.keys(firstLayerData)[0]]?.data[year] || {}).map(timestamp => ({ year, timestamp }));
    });
    if (data?.timestamp) {
      this.timestamp = data.timestamp;
    }
    if (data?.timestampsPerSecond) {
      this.timestampsPerSecond = data.timestampsPerSecond;
    }
  }

  componentWillLoad() {
    this.dataChanged(this.data);
    const year = this.data?.yearRange?.[0].toString();
    this.timestamp = { year, timestamp: '0' };
  }

  render() {
    if (this.data?.width) {
      this.hostElement.style.setProperty('--width', this.data.width);
    }
    return (
      <Host>
        <vis-main-collapse>
          <b slot="header">Time Control</b>
          <h3>{`Year: ${this.timestamp?.year}, Timestamp: ${this.timestamp?.timestamp}`}</h3>
          <input
            id="timestamp-slider"
            type="range"
            min={0}
            max={this.timestamps.length}
            value={this.timestamps.findIndex(t => t.year === this.timestamp.year && t.timestamp === this.timestamp.timestamp)}
            onInput={event => {
              const value = (event.currentTarget as HTMLInputElement).value;
              this.timestamp = this.timestamps[+value];
            }}
          />
          <div style={{ display: 'inline-block', padding: '.5rem 0' }}>
            <button
              disabled={this.playing}
              onClick={() => {
                clearInterval(this.animationTimer);
                this.animationTimer = setInterval(() => this.play(), MS_IN_SECOND / this.timestampsPerSecond);
                this.playing = true;
              }}
            >
              Play
            </button>
            <div style={{ display: 'inline-block', width: '.5rem' }}></div>
            <button
              disabled={!this.playing}
              onClick={() => {
                clearInterval(this.animationTimer);
                this.playing = false;
              }}
            >
              Pause
            </button>
            <div style={{ display: 'inline-block', width: '.5rem' }}></div>
            <label>Interval</label>
            <div style={{ display: 'inline-block', width: '.5rem' }}></div>
            <input
              style={{ width: '5rem' }}
              type="number"
              value={this.timestampsPerSecond}
              onChange={event => (this.timestampsPerSecond = +(event.currentTarget as HTMLInputElement).value)}
            />
          </div>
        </vis-main-collapse>
      </Host>
    );
  }

  private play() {
    const currentIndex = this.timestamps.indexOf(this.timestamp);
    let nextIndex = currentIndex + 1;
    if (currentIndex >= this.timestamps.length - 1) {
      nextIndex = 0;
    }
    this.timestamp = this.timestamps[nextIndex];
  }
}
