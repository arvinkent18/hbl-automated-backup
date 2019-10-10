var editor = CKEDITOR.replace('editorForm', {
            fullPage: true,
            allowedContent: true,
            extraAllowedContent: '*{*}',
            font_defaultLabel: 'Arial',
            extraPlugins: 'wysiwygarea',
            contentsCss: ['css/style.css'],
            basicEntities: false,
            enterMode: CKEDITOR.ENTER_BR,
            ignoreEmptyParagraph: true,
            fillEmptyBlocks: false,
            autoParagraph: false,
            uiColor: '#80dFfF',
            height: 800,
            width: 572,
            toolbar :
            [
                { name: 'buttons', 
                    items : [ 
                        'Source',
                        'Save', 
                        'Find',
                        'Replace',
                        'SpellChecker', 
                        'Link', 
                        'Unlink', 
                        'Image',
                        'HorizontalRule',
                        'SpecialChar', 
                        'Bold',
                        'Italic',
                        'Underline',
                        'Strike',
                        'Superscript',
                        'Subscript',
                        'Smiley',
                        'NumberedList',
                        'BulletedList', 
                        'Outdent', 
                        'Indent', 
                        'Blockquote', 
                        'About'
                    ] 
                }
            ]
        });