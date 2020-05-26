import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';
import * as docxNs from 'docx';
import * as FileSaver from 'file-saver';

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
    return <div>
      Hello, World! I'm {this.getText()}
      <button onClick={() => this.buildDocx()}>Docx</button>
    </div>;
  }

  private buildDocx() {
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
    docx.Packer.toBlob(doc).then((blob) => {
      FileSaver['default'].saveAs(blob, "example.docx");
    })
  }
}
