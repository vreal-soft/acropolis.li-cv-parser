import { CVSection } from "../../../cv-parser/dto/cvsection.dto";
import { SequenceDTO } from "../dto/sequence.dto";
import { PaddingDTO } from "../utils/dto/padding.dto";

export interface Sequencer {
  do(paddings: PaddingDTO, cvSection: CVSection, fromIdx: number): SequenceDTO;
}
