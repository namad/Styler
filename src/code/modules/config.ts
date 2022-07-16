import { Styler, Filler } from './styler';
import { defaultSettings } from './default-settings.js';

export const clientStorageKey = 'cachedSettings';

export class Config {
  // general
  useLayerOpacity: boolean;
  addPrevToDescription: boolean;
  framesPerSection: number;
  textsPerSection: number;
  notificationTimeout: number;
  updateUsingLocalStyles: boolean;
  partialMatch: boolean;
  reverseLayers: boolean;

  // stylers
  texter: Styler;
  grider: Styler;
  filler: Styler;
  strokeer: Styler;
  effecter: Styler;
  allStylers: Styler[];
  stylersWithoutTexter: Styler[];
  texterOnly: Styler[];

  constructor(options = defaultSettings) {
    const {
      // general
      useLayerOpacity = defaultSettings.useLayerOpacity,
      addPrevToDescription = defaultSettings.addPrevToDescription,
      framesPerSection = defaultSettings.framesPerSection,
      textsPerSection = defaultSettings.textsPerSection,
      notificationTimeout = defaultSettings.notificationTimeout,
      updateUsingLocalStyles = defaultSettings.updateUsingLocalStyles,
      partialMatch = defaultSettings.partialMatch,
      reverseLayers = defaultSettings.reverseLayers,

      // stylers
      texterPrefix = defaultSettings.texterPrefix,
      texterSuffix = defaultSettings.texterSuffix,
      griderPrefix = defaultSettings.griderPrefix,
      griderSuffix = defaultSettings.griderSuffix,
      fillerPrefix = defaultSettings.fillerPrefix,
      fillerSuffix = defaultSettings.fillerSuffix,
      strokeerPrefix = defaultSettings.strokeerPrefix,
      strokeerSuffix = defaultSettings.strokeerSuffix,
      effecterPrefix = defaultSettings.effecterPrefix,
      effecterSuffix = defaultSettings.effecterSuffix,
    } = options;

    this.useLayerOpacity = useLayerOpacity;
    this.addPrevToDescription = addPrevToDescription;
    this.framesPerSection = framesPerSection;
    this.textsPerSection = textsPerSection;
    this.notificationTimeout = notificationTimeout;
    this.updateUsingLocalStyles = updateUsingLocalStyles;
    this.partialMatch = partialMatch;
    this.reverseLayers = reverseLayers;

    this.texter = new Styler({
      name: 'texter',
      styleType: 'text',
      styleProps: [
        'fontName',
        'fontSize',
        'letterSpacing',
        'lineHeight',
        'paragraphIndent',
        'paragraphSpacing',
        'textCase',
        'textDecoration',
      ],
      prefix: texterPrefix,
      suffix: texterSuffix,
    });
    this.grider = new Styler({
      name: 'grider',
      styleType: 'grid',
      styleProps: ['layoutGrids'],
      prefix: griderPrefix,
      suffix: griderSuffix,
    });
    this.filler = new Filler({
      name: 'filler',
      styleType: 'paint',
      styleProps: ['paints'],
      layerProps: ['fills'],
      layerPropType: 'fill',
      prefix: fillerPrefix,
      suffix: fillerSuffix,
      useLayerOpacity: useLayerOpacity
    });
    this.strokeer = new Styler({
      name: 'strokeer',
      styleType: 'paint',
      styleProps: ['paints'],
      layerProps: ['strokes'],
      layerPropType: 'stroke',
      prefix: strokeerPrefix,
      suffix: strokeerSuffix,
      useLayerOpacity: useLayerOpacity
    });
    this.effecter = new Styler({
      name: 'effecter',
      styleType: 'effect',
      styleProps: ['effects'],
      prefix: effecterPrefix,
      suffix: effecterSuffix,
    });

    this.allStylers = [this.texter, this.filler, this.strokeer, this.effecter, this.grider];
    this.stylersWithoutTexter = [this.filler, this.strokeer, this.effecter, this.grider];
    this.texterOnly = [this.texter];
  }
}
