import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';
import * as docxNs from "docx";

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    const docx = docxNs['default'];
    const doc = new docx.Document();
    doc.addSection({
      properties: {},
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun("Hello World"),
            new docx.TextRun({
              text: "Foo Bar",
              bold: true,
            }),
            new docx.TextRun({
              text: "\tGithub is the best",
              bold: true,
            }),
          ],
        }),
      ],
    });
    docx.Packer.toBuffer(doc).then((buffer) => {
      console.log(buffer);
    })

    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
