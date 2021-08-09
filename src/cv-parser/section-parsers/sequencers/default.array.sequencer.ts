import { Sequencer } from './sequencer.interface';
import { SequenceDTO } from '../dto/sequence.dto';

import { PaddingDTO } from '../utils/dto/padding.dto';
import { CVSection } from '../../dto/cvsection.dto';

export class DefaultArraySequencer implements Sequencer {
  do(paddings: PaddingDTO, cvSection: CVSection, fromIdx: number): SequenceDTO {
    let sequence = new SequenceDTO();
    sequence.result = cvSection.items[fromIdx][0] ?? null;

    for (; fromIdx < cvSection.items.length - 1; fromIdx++) {
      const curPadding = Math.round(
        cvSection.items[fromIdx + 1][1] - cvSection.items[fromIdx][1],
      );

      // append small padding lines
      if (curPadding < paddings.biggestPadding) {
        sequence.result += ' ' + cvSection.items[fromIdx + 1][0];
        sequence.processedLines++;
      } else {
        return sequence; // big padding detected
      }
    }

    return sequence;
  }
}
