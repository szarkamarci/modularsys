import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const targetDirs = [
    'src/components/ui',
    'src/components/layout',
    'src/features',
    'src/lib',
    'src/config'
];

let files = [];
targetDirs.forEach(dir => {
    files = files.concat(walk(dir));
});

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove "use client"
    content = content.replace(/['"]use client['"];?\n?/g, '');
    
    // Replace next/link
    content = content.replace(/import\s+Link\s+from\s+['"]next\/link['"]/g, "import { Link } from 'react-router-dom'");
    
    // Replace next/navigation hooks
    if (content.includes('next/navigation')) {
        content = content.replace(/import\s+\{[^}]*\}\s+from\s+['"]next\/navigation['"]/g, (match) => {
            const imports = [];
            if (match.includes('usePathname')) imports.push('useLocation');
            if (match.includes('useRouter')) imports.push('useNavigate');
            return imports.length > 0 ? `import { ${imports.join(', ')} } from 'react-router-dom'` : '';
        });
    }

    // Replace useRouter instances
    content = content.replace(/useRouter\(\)/g, "useNavigate()");
    // Next.js router.push -> navigate
    content = content.replace(/router\.push\(/g, "navigate(");
    
    // Replace usePathname instances
    if (content.includes('usePathname()')) {
        content = content.replace(/usePathname\(\)/g, "useLocation().pathname");
    }

    // Replace next/image
    content = content.replace(/import\s+Image\s+from\s+['"]next\/image['"]/g, '');
    content = content.replace(/<Image([^>]+)\/?>/g, (match, props) => {
        // Simple heuristic to change Image to img
        let newProps = props.replace(/priority=\{?[^}]*\}?/g, '')
                            .replace(/fill=\{?[^}]*\}?/g, '')
                            .replace(/quality=\{?[^}]*\}?/g, '');
        return `<img${newProps} />`;
    });

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Migration script completed.');
