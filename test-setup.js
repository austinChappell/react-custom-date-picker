// used to disable request animation frame polyfill warning
import raf from './src/tempPolyfills'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });