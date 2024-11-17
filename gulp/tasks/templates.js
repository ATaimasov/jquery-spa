import fs from 'fs/promises';
import path from 'path';


// Функция для рекурсивного чтения всех HTML файлов в директории
async function readFilesRecursively(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(await readFilesRecursively(fullPath));
        } else if (entry.isFile() && path.extname(entry.name) === '.html') {
            files.push(fullPath);
        }
    }

    return files;
}

async function processIncludes(content, baseDir) {
    const includeRegex = /@@include\(['"](.+?)['"]\s*(?:,\s*({.*?}))?\)/g;
    let match;
    let processedContent = content;

    console.log('Запуск обработки включений HTML-шаблонов в JS...')

    while ((match = includeRegex.exec(content)) !== null) {
          console.group('Найдено включение:', match[0]);
          console.log('Путь к файлу:', match[1]);
          console.log('Параметры (если есть):', match[2]);
          console.log('');
          console.groupEnd();
         
        const [fullMatch, includePath, paramsString] = match;
        const params = paramsString ? JSON.parse(paramsString) : {};
        const fullIncludePath = path.join(baseDir, includePath);
        try {
            let includeContent = await fs.readFile(fullIncludePath, 'utf8');
            // Рекурсивно обрабатываем включения в включенном файле
            includeContent = await processIncludes(includeContent, path.dirname(fullIncludePath));
            // Заменяем параметры в включенном содержимом
            for (const [key, value] of Object.entries(params)) {
                const paramRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                includeContent = includeContent.replace(paramRegex, value);
            }
            
            processedContent = processedContent.replace(fullMatch, includeContent);
        } catch (error) {
            console.error(`Ошибка при обработке включения ${includePath}:`, error);
        }
    } 

    return processedContent;
}


export const generateTemplates = async () => {
    const templatesDir = app.path.src.templates;
    console.info('Директория шаблонов:', templatesDir);
    
    try {
        const files = await readFilesRecursively(templatesDir);
        console.info('Найденные HTML файлы:', files);

        if (files.length === 0) {
            console.warn('HTML файлы не найдены. Файл templates.js не создан.');
            return;
        }

        let templatesContent = 'export const pagesTemplates = {';
        for (const filePath of files) {
            try {
                let content = await fs.readFile(filePath, 'utf8');
                // Рекурсивно обрабатываем включения в содержимом файлов
                content = await processIncludes(content, path.dirname(filePath));
                const relativePath = path.relative(templatesDir, filePath);
                const pageName = path.basename(filePath, '.html');
                console.log(`Обработка файла: ${pageName}`);
                if (content.trim()) {
                    templatesContent += `'${pageName}': \`${content}\`,`;
                    console.log(`Добавлено содержимое для ${pageName}`);
                } else {
                    console.warn(`Файл ${filePath} пуст и будет пропущен.`);
                }
            } catch (fileError) {
                console.error(`Ошибка при чтении файла ${filePath}:`, fileError);
            }
        }
        templatesContent += '};';
        
        const outputPath = path.join(app.path.build.templates, 'templates.js');
        await fs.writeFile(outputPath, templatesContent);
        console.log(`Шаблоны успешно сгенерированы и записаны в ${outputPath}`);
    } catch (error) {
        console.error('Общая ошибка при генерации шаблонов:', error);
    }
};