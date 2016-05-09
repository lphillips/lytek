import vis from 'vis';

var Box = vis.network.shapes.Box;

export default class CharmShape extends Box.default {
    constructor(options, body, labelModule) {
        super(options, body, labelModule);
    }

    resize(ctx, selected) {
        super.resize(ctx, selected);
        if (this.width < 160) {
            this.width = 160;
        }
        if (this.height < 120) {
            this.height = 120;
        }
    }
}