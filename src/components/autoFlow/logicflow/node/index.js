import {
  Assigntype,
  AssignNodeModel,
  AssignNodeView
} from './assignment/assignment'
import { SwitchType, SwitchNodeModel, SwitchNodeView } from './switch/switch'
import { StartType, StartNodeModel, StartNodeView } from './start/startnode'
import { RecordType, RecordNodeModel, RecordNodeView } from './record/record'
import { CycleType, cycleNodeModel, cycleNodeView } from './cycle/cycle'
import { EndType, EndNodeModel, EndNodeView } from './end/endnode'
import { AutoType, AutoNodeModel, AutoNodeView } from './node/autonode'

export default {
  AssignNode: {
    type: Assigntype,
    view: AssignNodeView,
    model: AssignNodeModel
  },
  SwitchNode: {
    type: SwitchType,
    view: SwitchNodeView,
    model: SwitchNodeModel
  },
  StartNode: {
    type: StartType,
    view: StartNodeView,
    model: StartNodeModel
  },
  RecordNode: {
    type: RecordType,
    view: RecordNodeView,
    model: RecordNodeModel
  },
  CycleNode: {
    type: CycleType,
    view: cycleNodeView,
    model: cycleNodeModel
  },
  EndNode: {
    type: EndType,
    view: EndNodeView,
    model: EndNodeModel
  },
  AutoNode: {
    type: AutoType,
    view: AutoNodeView,
    model: AutoNodeModel
  }
}
