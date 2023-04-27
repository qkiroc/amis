import {getAttrBoolean} from '../../OpenXML';
import Word from '../../Word';
import {BlipFill} from './BlipFill';
import {ShapePr} from './ShapeProperties';

export class Pic {
  blipFill: BlipFill;
  spPr: ShapePr;

  /**
   * 替换图片的地址
   */
  alt?: string;

  static fromXML(word: Word, element?: Element | null): Pic {
    const pic = new Pic();

    const cNvPr = element?.getElementsByTagName('pic:cNvPr').item(0);
    if (cNvPr) {
      pic.alt = cNvPr.getAttribute('descr') || '';
      const hidden = getAttrBoolean(cNvPr, 'hidden', false);
      if (hidden) {
        return pic;
      }
    }

    pic.blipFill = BlipFill.fromXML(
      word,
      element?.getElementsByTagName('pic:blipFill').item(0)
    );
    pic.spPr = ShapePr.fromXML(
      word,
      element?.getElementsByTagName('pic:spPr').item(0)
    );
    return pic;
  }
}
