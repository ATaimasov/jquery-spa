import fs from 'fs';
import path from 'path';

export const templates = () => {
    const templatesDir = './src/blocks/main/pages';
    let templatesContent = 'export const pagesTemplates = {';
    
    fs.readdirSync(templatesDir).forEach(file => {
        if (path.extname(file) === '.html') {
            const content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
            const pageName = path.basename(file, '.html');
            templatesContent += `'${pageName}': \`${content.replace(/`/g, '\\`')}\`,`;
        }
    });
    
    templatesContent += '};';
    
    fs.writeFileSync('./src/js/templates.js', templatesContent);
    return Promise.resolve();
}